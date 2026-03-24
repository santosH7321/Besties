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

interface OnOfferInterface {
    offer: RTCSessionDescriptionInit
    from: string
}

interface OnAnswerInterface {
    answer: RTCSessionDescriptionInit
    from: string
}


interface OnCandidateInterface {
    candidate: RTCIceCandidateInit
    from: string
}

type CallType = "pending" | "calling" | "incomming" | "talking" | "end"

function getCallTiming(seconds: number): string {
  const hrs = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, '0');
  const mins = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');

  return `${hrs}:${mins}:${secs}`;
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
    const [status, setStatus] = useState<CallType>("pending")
    const [timer, setTimer] = useState(0)

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
                const stream = await navigator.mediaDevices.getUserMedia({video: true})
    
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
        try {
            const localStream = localStreamRef.current
            if(!localStream)
                return

            const audioTrack = localStream.getTracks().find((tracks)=>tracks.kind === "audio")
            if(audioTrack)
            {
                audioTrack.enabled = !audioTrack.enabled
                setIsMic(audioTrack.enabled)
            }
        }
        catch(err)
        {
            CatchError(err)
        }
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
        
        localStream.getTracks().forEach((track)=>{
            rtc.current?.addTrack(track, localStream)
        })

        rtc.current.onicecandidate = (e)=>{
            if(e.candidate)
            {
                socket.emit("candidate", {candidate: e.candidate, to: id})
            }
        }

        rtc.current.onconnectionstatechange = ()=>{
            console.log(rtc.current?.connectionState)
        }

        rtc.current.ontrack = (e)=>{
            const remoteStream = e.streams[0]
            const remoteVideo = remoteVideoRef.current

            if(!remoteStream || !remoteVideo)
                return

            remoteVideo.srcObject = remoteStream

            const videoTracks = remoteStream.getVideoTracks()[0]
            if(videoTracks)
            {
                videoTracks.onmute = ()=>{
                    console.log("video off")
                    remoteVideo.style.display = "none"
                }

                videoTracks.onunmute = ()=>{
                    remoteVideo.style.display = "block"
                }

                videoTracks.onended = ()=>{
                    remoteVideo.srcObject = null
                    remoteVideo.style.display = "none"
                }
            }
        }
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
            setStatus("calling")
            notify.open({
                title: "Nishant Ranjan",
                description: "Calling...",
                duration: 30,
                placement: "bottomRight",
                actions: [
                    <button key="end" className='bg-rose-400 px-3 py-1 rounded text-white hover:bg-rose-500' onClick={endCall}>End call</button>
                ]
            })
            socket.emit("offer", {offer, to: id})
        }
        catch(err)
        {
            CatchError(err)
        }
    }

    const accept = async (payload: OnOfferInterface)=>{
        try {
            webRtcConnection()

            if(!rtc.current)
                return

            const offer = new RTCSessionDescription(payload.offer)
            await rtc.current.setRemoteDescription(offer)

            const answer = await rtc.current.createAnswer()
            await rtc.current.setLocalDescription(answer)

            notify.destroy()
            setStatus("talking")
            socket.emit("answer", {answer, to: id})
        }
        catch(err)
        {
            CatchError(err)
        }
    }

    // too end call on local computer
    const endCall = ()=>{
        setStatus("end")
        socket.emit("end", {to: id})
    }

    // too end call on remote computer
    const onEnd = ()=>{
        endCall()
    }

    // Event listerners
    const onOffer = (payload: OnOfferInterface)=>{  
        setStatus("incomming")
        notify.open({
            title: "Santosh Kumar",
            description: "Incomming call...",
            duration: 30,
            placement: "bottomRight",
            actions: [
                <div key="calls" className='space-x-4'>
                    <button className='bg-green-400 px-3 py-1 rounded text-white hover:bg-green-500' onClick={()=>accept(payload)}>Accept</button>
                    <button className='bg-rose-400 px-3 py-1 rounded text-white hover:bg-rose-500' onClick={endCall}>Reject</button>
                </div>
            ]
        })
    }

    // Connect both user via webrtc
    const onCandidate = async (payload: OnCandidateInterface)=>{
        try {
            if(!rtc.current)
                return

            const candidate = new RTCIceCandidate(payload.candidate)
            await rtc.current.addIceCandidate(candidate)
        }
        catch(err)
        {
            CatchError(err)
        }
    }

    const onAnswer = async (payload: OnAnswerInterface)=>{
        try {
            if(!rtc.current)
                return

            const answer = new RTCSessionDescription(payload.answer)
            await rtc.current.setRemoteDescription(answer)

            setStatus("talking")
            notify.destroy()
        }
        catch(err)
        {
            CatchError(err)
        }
    }

    useEffect(()=>{
        toggleVideo()
        socket.on("offer", onOffer)
        socket.on("candidate", onCandidate)
        socket.on("answer", onAnswer)
        socket.on("end", onEnd)
        
        return ()=>{
            socket.off("offer", onOffer)
            socket.off("candidate", onCandidate)
            socket.off("answer", onAnswer)
            socket.off("end", onEnd)
        }
    }, [])

    // control sound
    useEffect(()=>{
        let interval: any

        if(status === "pending")
            return

        if(!audio.current)
        {
            clearInterval(interval)
            audio.current = new Audio()
        }

        if(status === "calling" || status === "incomming")
        {
            clearInterval(interval)
            audio.current.pause()
            audio.current.src = "/sound/ring.mp3"
            audio.current.currentTime = 0
            audio.current.load()
            audio.current.play()
        }

        if(status === "talking")
        {
            clearInterval(interval)
            audio.current.pause()
            audio.current.currentTime = 0
            interval = setInterval(() => {
                setTimer((prev)=>prev+1)
            }, 1000);
        }

        if(status === "end")
        {
            clearInterval(interval)
            audio.current.pause()
            audio.current.src = "/sound/reject.mp3"
            audio.current.currentTime = 0
            audio.current.load()
            audio.current.play()
            notify.destroy()
        }

        return ()=>{
            if(audio.current)
            {
                audio.current.pause()
                audio.current.currentTime = 0
                audio.current = null
            }
            clearInterval(interval)
        }
    }, [status])

    return (
        <div className='space-y-8'>
            <div ref={remoteVideoContainerRef} className='bg-black w-full h-0 relative pb-[56.25%] rounded-xl'>
                <video ref={remoteVideoRef} className='w-full h-full absolute top-0 left-0' autoPlay playsInline></video>
                <button className='absolute bottom-5 left-5 text-xs px-2.5 py-1 rounded-lg text-white' style={{
                    background: 'rgba(0,0,0,0.7)'
                }}>
                    Santosh Kumar
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
                    {
                        status === "talking" &&
                        <label>{getCallTiming(timer)}</label>
                    }
                    {
                        (status === "pending" || status === "end") &&
                        <Button icon="phone-line" type="success" onClick={startCall}>Call</Button>
                    }

                    {
                        status === "talking" &&
                        <Button icon="close-cirrcle-line" type="danger" onClick={endCall}>End</Button>
                    }
                </div>
            </div>
            {notifyUi}
        </div>
    )
}

export default Video