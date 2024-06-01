import React, { useState } from 'react'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme/muiTheme'

import { SnackbarData } from '@src/types/snackbar'
import { SetTime } from '@src/components/SetTime.tsx'
import { AddTeamDialog, Team } from '@src/components/AddTeamDialog.tsx'
import { EditTeamDialog } from '@src/components/EditTeamDialog.tsx'

const { ipcRenderer } = window.require('electron')

// TODO: AFTER APPLICATION IS LOADED WE HAVE TO GET THE SCENARIO DATA FROM THE SERVER
// IF THE SCENARIO DOES NOT HAVE STEPS WE HAVE TO GRAB THEM FROM SCRIPTS AND SAVE THEM TO THE SCENARIO
// APP SHOULD BE A WRAPPER AND WE HAVE TO CREATE TO SEPARATE COMPONENTS

const App: React.FC = () => {
    const [isOpenAddTeamDialog, setIsOpenAddTeamDialog] = React.useState(false)
    const [snackbarData, setSnackbarData] = React.useState<SnackbarData>({
        type: 'info',
        showSnackBar: false,
        message: '',
    })

    const [teams, setTeams] = useState<Team[]>([])
    const [edittedUserIndex, setEdittedUserIndex] = useState<number | null>(
        null
    )

    const onClickOpenClock = async () => {
        await ipcRenderer.sendSync('open-clock')
    }

    const onClickStartClock = async () => {
        await ipcRenderer.sendSync('start-clock', { teams })
    }

    const onClickStopClock = async () => {
        await ipcRenderer.sendSync('stop-clock')
    }

    const pretendentToKing = async () => {
        const king = teams.shift() as Team
        const newTeams = [...teams]
        newTeams.push(king)
        setTeams(newTeams)
        await ipcRenderer.sendSync('setTeams', { teams: newTeams })
    }

    const newPretendent = async () => {
        const king = teams.shift() as Team
        const currentPretendent = teams.shift() as Team
        const newTeams = [king, ...teams, currentPretendent]
        setTeams(newTeams)
        await ipcRenderer.sendSync('setTeams', { teams: newTeams })
    }

    React.useEffect(() => {
        ipcRenderer.on(
            'setSnackbar',
            (_event: Event, _snackbarData: SnackbarData) => {
                setSnackbarData(_snackbarData)
            }
        )

        return () => {
            ipcRenderer.removeAllListeners('isLoading')
        }
    }, [])

    const handleAddTeam = (team: Team) => setTeams([...teams, team])
    const editTeam = (team: Team) => {
        const newTeams = [...teams]

        if (edittedUserIndex === null) return

        newTeams[edittedUserIndex] = team
        setTeams(newTeams)
    }
    const handleEditTeamClose = () => setEdittedUserIndex(null)
    const sortTeams = () => {
        const sortedTeams = [...teams].sort(
            (a, b) => (a.startPosition ?? 5) - (b.startPosition ?? 5)
        )
        setTeams(sortedTeams)
    }

    return (
        <ThemeProvider theme={theme}>
            <div>
                <div>
                    <h4>Akcje</h4>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '10px',
                        }}
                    >
                        <button
                            onClick={async () => {
                                await onClickOpenClock()
                            }}
                        >
                            Otwórz zegar
                        </button>
                        <button
                            onClick={async () => {
                                await onClickStartClock()
                            }}
                        >
                            START
                        </button>
                        <button
                            onClick={async () => {
                                await onClickStopClock()
                            }}
                        >
                            STOP
                        </button>
                        <button onClick={() => setIsOpenAddTeamDialog(true)}>
                            Dodaj drużynę
                        </button>
                        <button onClick={pretendentToKing}>
                            Pretendent na króla
                        </button>
                        <button onClick={newPretendent}>Nowy pretendent</button>
                    </div>
                </div>
                <SetTime />
                <AddTeamDialog
                    isOpen={isOpenAddTeamDialog}
                    handleClose={setIsOpenAddTeamDialog}
                    handleAddTeam={handleAddTeam}
                />
                <div>
                    <h4>Drużyny</h4>
                    <button onClick={sortTeams}>Sortuj po pozycji</button>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: 'fit-content',
                            gap: '10px',
                        }}
                    >
                        {teams.map((team, index) => (
                            <div
                                key={`${team.player1}-${team.player2}`}
                                style={{
                                    display: 'flex',
                                    gap: '10px',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <p style={{ margin: 0 }}>
                                    <b>{index + 1}.</b> {team.player1} -{' '}
                                    {team.player2}
                                </p>
                                <button
                                    onClick={() => setEdittedUserIndex(index)}
                                >
                                    Edytuj
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                {edittedUserIndex !== null && (
                    <EditTeamDialog
                        isOpen
                        player1={teams[edittedUserIndex].player1}
                        player2={teams[edittedUserIndex].player2}
                        teamColor={teams[edittedUserIndex].teamColor}
                        startPosition={teams[edittedUserIndex].startPosition}
                        handleClose={handleEditTeamClose}
                        handleEditTeam={editTeam}
                    />
                )}
            </div>
        </ThemeProvider>
    )
}

export default App
