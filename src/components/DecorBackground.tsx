export default function DecorBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-32 -left-32 h-[32rem] w-[32rem] rounded-full bg-gradient-to-br from-sky-300 via-indigo-300 to-purple-300 opacity-40 blur-3xl animate-float-slow" />
      <div className="absolute -bottom-40 -right-20 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-amber-200 via-rose-200 to-pink-300 opacity-40 blur-3xl animate-float" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(14,165,233,0.08),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(244,114,182,0.08),transparent_45%)]" />
    </div>
  )
}