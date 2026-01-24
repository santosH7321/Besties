const Layout = () => {
  const leftAsideSize = 350
  const rightAsideSize = 450

  return (
    <div className="min-h-screen">
      <aside
        className="bg-red-500 fixed top-0 left-0 h-full p-8 overflow-auto"
        style={{ width: leftAsideSize }}
      />

      <section
        className="bg-amber-700 min-h-screen"
        style={{
          marginLeft: leftAsideSize,
          marginRight: rightAsideSize,
        }}
      />

      <aside
        className="bg-rose-500 fixed top-0 right-0 h-full p-8 overflow-auto"
        style={{ width: rightAsideSize }}
      />
    </div>
  )
}

export default Layout