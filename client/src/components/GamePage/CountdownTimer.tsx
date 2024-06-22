export const CountdownTimer = ({ seconds = 0 }: { seconds?: number }) => {
  return (
    !!seconds && (
      <div className="timer-container">
        <div className="timer">00:{seconds}</div>
      </div>
    )
  )
}
