import React from "react";
const { ipcRenderer } = window.require("electron");

export const SetTime = () => {
    const [minutes, setMinutes] = React.useState(0)
    const [seconds, setSeconds] = React.useState(0)

    const onSetTime = async (event: any) => {
        event.preventDefault();
        await ipcRenderer.sendSync("set-clock", {minutes, seconds} )
        console.log("set time")
    }

    const onChangeMinutes = (event: any) => {
        setMinutes(event.target.value)
    }

    const onChangeSeconds = (event: any) => {
        setSeconds(event.target.value)
    }

    return <form style={{display: "flex", flexDirection: "column"}} onSubmit={onSetTime}>
        <p>Ustaw czas</p>
        <input type="number" placeholder="minuty" id="minutes" onChange={onChangeMinutes} />
        <input type="number" placeholder="sekundy" id="seconds" onChange={onChangeSeconds}/>
        <button type="submit">
            Ustaw
        </button>
    </form>
}
