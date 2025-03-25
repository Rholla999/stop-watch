import { useEffect, useRef, useState } from "react"

function StopWatch() {


    const [timer, setTimer] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const intervalRef = useRef(null)
    const setTimerRef = useRef(0)

    useEffect(() => {
        if(isRunning){
            intervalRef.current = setInterval(() => {
                setTimer(Date.now() - setTimerRef.current)
            }, 10)
        }

        return () => {
            clearInterval(intervalRef.current)
        }
    }, [isRunning])

    function formatTime(){
        let hours = Math.floor(timer / (1000 * 60 * 60))
        let minutes = Math.floor(timer / (1000 * 60) % 60)
        let seconds = Math.floor(timer / (1000) % 60)
        let milSeconds = Math.floor((timer % 1000) / 10)
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milSeconds).padStart(2, '0')}`
    }

    function startWatch(){
        setIsRunning(true)
        setTimerRef.current = Date.now() - timer
    }

    function pauseWatch(){
        setIsRunning(false)
    }

    function resetWatch(){
        setIsRunning(false)
        setTimer(0)
    }


    return (



        <div className="container">
            <h2>Stop Watch</h2>
            <p className="display">{formatTime()}</p>
            <div className="controls">
                <button onClick={startWatch}>Start</button>
                <button onClick={pauseWatch}>Pause</button>
                <button onClick={resetWatch}>Reset</button>
            </div>
        </div>
    )
}


export default StopWatch