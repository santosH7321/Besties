import { useContext, useEffect, useRef, useState } from 'react'
import CatchError from '../../lib/CatchError'
import Button from '../shared/Button'
import Context from '../../Contex'
import { toast } from 'react-toastify'
import socket from '../../lib/Socket'
import { useParams } from 'react-router-dom'
import { notification } from 'antd'


const config = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" }
  ]
}

const Video = () => {
    const {session} = useContext(Context)
    const {id} = useParams()
    const [notify, notifyUi] = notification.useNotification()

    const localVideoContainerRef = useRef<HTMLDivElement | null>(null)
    const localVideoRef = useRef<HTMLVideoElement | null>(null)
    const remoteVideoContainerRef = useRef<HTMLDivElement | null>(null)
    const remoteVideoRef = useRef<HTMLVideoElement | null>(null)
    const localStreamRef = useRef<MediaStream | null>(null)
    const rtc = useRef<RTCPeerConnection | null>(null)
    const audio = useRef<HTMLAudioElement | null>(null)

    const [isVideoSharing, setIsVideoSharing] = useState(false)
    const [isScreenSharing, setIsScreenSharing] = useState(false)
    const [isMic, setIsMic] = useState(false)

    const toggleScreen = async ()=>{
        try {
            const localVideo = localVideoRef.current

            if(!localVideo)
                return

            if(!isScreenSharing)
            {
                const stream = await navigator.mediaDevices.getDisplayMedia({video: true})
    
                localVideo.srcObject = stream
                localStreamRef.current = stream
                setIsScreenSharing(true)
            }
            else {
                const localStream = localStreamRef.current
                if(!localStream)
                    return

                localStream.getTracks().forEach((track)=>{
                    track.stop()
                })

                localVideo.srcObject = null
                localStreamRef.current = null
                setIsScreenSharing(false)
            }
        }
        catch(err)
        {
            CatchError(err)
        }
    }

    const toggleVideo = async ()=>{
        try {
            const localVideo = localVideoRef.current

            if(!localVideo)
                return

            if(!isVideoSharing)
            {
                const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true})
    
                localVideo.srcObject = stream
                localStreamRef.current = stream
                setIsVideoSharing(true)
                setIsMic(true)
            }
            else {
                const localStream = localStreamRef.current
                if(!localStream)
                    return

                localStream.getTracks().forEach((track)=>{
                    track.stop()
                })

                localVideo.srcObject = null
                localStreamRef.current = null
                setIsVideoSharing(false)
                setIsMic(false)
            }
        }
        catch(err)
        {
            CatchError(err)
        }
    }

    const toggleMic = ()=>{
        alert("wait")
    }

    const toggleFullScreen = (type: 'local' | 'remote')=>{
        try {
            if(!isVideoSharing && !isScreenSharing)
                return toast.warn("Please start your video first", {position: 'top-center'})

            const videoContainer = (type === "local" ? localVideoContainerRef.current : remoteVideoContainerRef.current)
            if(!videoContainer)
                return

            if(!document.fullscreenElement)
            {
                videoContainer.requestFullscreen()
            }
            else {
                document.exitFullscreen()
            }
        }
        catch(err)
        {
            CatchError(err)
        }
    }

    const webRtcConnection = ()=>{
        rtc.current = new RTCPeerConnection(config)
        const localStream = localStreamRef.current
        
        if(!localStream)
            return
        
        rtc.current.onicecandidate = (e)=>{
            console.log(e.candidate)
        }

        rtc.current.onconnectionstatechange = ()=>{
            console.log(rtc.current?.connectionState)
        }

        rtc.current.ontrack = ()=>{
            console.log("Something is comming from remote user")
        }

        localStream.getTracks().forEach((track)=>{
            rtc.current?.addTrack(track, localStream)
        })
    }

    const startCall = async ()=>{
        try {
            if(!isVideoSharing && !isScreenSharing)
                return toast("Start your video first", {position: 'top-center'})

            webRtcConnection()

            if(!rtc.current)
                return

            const offer = await rtc.current.createOffer()
            await rtc.current.setLocalDescription(offer)
            socket.emit("offer", {offer, to: id})
        }
        catch(err)
        {
            CatchError(err)
        }
    }

    const endCall = ()=>{
        alert()
    }

    // Event listerners
    const onOffer = (payload: any)=>{
        audio.current = new Audio("/sound/ring.mp3")
        audio.current.load()
        audio.current.play()
        
        notification.open({
            message: "Santosh Kumar",
            description: "Incomming call...",
            duration: 30,
            placement: "bottomRight"
        })
    }

    useEffect(()=>{
        socket.on("offer", onOffer)

        return ()=>{
            socket.off("offer", onOffer)
        }
    }, [])

    return (
        <div className='space-y-8'>
            <div ref={remoteVideoContainerRef} className='bg-black w-full h-0 relative pb-[56.25%] rounded-xl'>
                <video ref={remoteVideoRef} className='w-full h-full absolute top-0 left-0' autoPlay playsInline></video>
                <button className='absolute bottom-5 left-5 text-xs px-2.5 py-1 rounded-lg text-white' style={{
                    background: 'rgba(0,0,0,0.7)'
                }}>
                    Nishant Ranjan
                </button>

                <button onClick={()=>toggleFullScreen("remote")} className='absolute bottom-5 right-5 text-xs px-2.5 py-1 rounded-lg text-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110' style={{
                    background: 'rgba(0,0,0,0.7)'
                }}>
                    <i className="ri-fullscreen-exit-line"></i>
                </button>
            </div>

            <div className='grid grid-cols-3 gap-4'>
                <div ref={localVideoContainerRef} className='bg-black w-full h-0 relative pb-[56.25%] rounded-xl'>
                    <video ref={localVideoRef} className='w-full h-full absolute top-0 left-0'autoPlay playsInline></video>
                    <button className='capitalize absolute bottom-2 left-2 text-xs px-2.5 py-1 rounded-lg text-white' style={{
                        background: 'rgba(0,0,0, 0.7)'
                    }}>
                        {session && session.fullname}
                    </button>
                     <button onClick={()=>toggleFullScreen("local")} className='absolute bottom-2 right-2 text-xs px-2.5 py-1 rounded-lg text-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110' style={{
                        background: 'rgba(0,0,0, 0.7)'
                    }}>
                        <i className="ri-fullscreen-exit-line"></i>
                    </button>
                </div>

                <Button type="primary" icon='user-add-line'>Add</Button>
            </div>

            <div className='flex justify-between items-center'>
                <div className='space-x-4'>
                    <button 
                        onClick={toggleVideo} 
                        className={`${isVideoSharing ? "bg-green-500" : "bg-green-300"} text-white w-12 h-12 rounded-full hover:bg-green-400 hover:text-white`}
                    >
                        {
                            isVideoSharing ?
                            <i className="ri-video-on-ai-line"></i>
                            :
                            <i className="ri-video-off-line"></i>
                        }
                    </button>

                    <button onClick={toggleMic} className='bg-amber-500 text-white w-12 h-12 rounded-full hover:bg-amber-400 hover:text-white'>
                        {
                            isMic ?
                            <i className="ri-mic-line"></i>
                            :
                            <i className="ri-mic-off-line"></i>
                        }
                    </button>

                    <button 
                        onClick={toggleScreen} 
                        className={`${isScreenSharing ? 'bg-blue-500' : 'bg-blue-300'} text-white w-12 h-12 rounded-full hover:bg-blue-400 hover:text-white`}
                    >
                        {
                            isScreenSharing ?
                            <i className="ri-tv-2-line"></i>
                            :
                            <i className="ri-chat-off-line"></i>
                        }
                    </button>
                    
                </div>
                <div className='space-x-4'>
                    <Button icon="phone-line" type="success" onClick={startCall}>Call</Button>
                    <Button icon="close-circle-fill" type="danger" onClick={endCall}>End</Button>
                </div>
            </div>
            {notifyUi}
        </div>
    )
}

export default Video