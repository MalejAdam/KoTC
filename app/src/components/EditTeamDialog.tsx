import { Dialog, Input, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Team } from '@src/components/AddTeamDialog.tsx'

type Props = Omit<Team, 'spentTime'> & {
    isOpen: boolean
    handleClose: (value: boolean) => void
    handleEditTeam: (team: Team) => void
}

export const EditTeamDialog = ({
    isOpen,
    handleClose,
    handleEditTeam,
    teamColor,
    player1,
    player2,
    startPosition,
    points = 0,
}: Props) => {
    const { register, handleSubmit, reset } = useForm<Team>({
        defaultValues: {
            player1,
            player2,
            teamColor,
            startPosition,
            points,
        },
    })

    const onSubmit = ({
        player1,
        player2,
        teamColor,
        startPosition,
        points,
    }: Team) => {
        if (!player1 || !player2) return

        handleEditTeam({ player1, player2, teamColor, startPosition, points })
        handleClose(false)
    }

    return (
        <Dialog open={isOpen}>
            <form style={{ padding: '30px' }} onSubmit={handleSubmit(onSubmit)}>
                <div style={{ marginBottom: '20px' }}>
                    <h1>Dodaj drużynę</h1>
                    <p>Zawodnik 1:</p>
                    <Input style={{ width: '100%' }} {...register('player1')} />
                    <p>Zawodnik 2:</p>
                    <Input style={{ width: '100%' }} {...register('player2')} />
                    <p>Kolor:</p>
                    <Select
                        style={{ width: '100%' }}
                        defaultValue={teamColor}
                        {...register('teamColor')}
                    >
                        <MenuItem value="red">Czerwony</MenuItem>
                        <MenuItem value="blue">Niebieski</MenuItem>
                        <MenuItem value="green">Zielony</MenuItem>
                        <MenuItem value="yellow">Żółty</MenuItem>
                        <MenuItem value="purple">Fioletowy</MenuItem>
                    </Select>
                    <p>Pozycja startowa:</p>
                    <Input
                        type="number"
                        style={{ width: '100%' }}
                        {...register('startPosition')}
                    />
                    <p>Punkty:</p>
                    <Input
                        type="number"
                        style={{ width: '100%' }}
                        {...register('points')}
                    />
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <button onClick={() => handleClose(false)}>Anuluj</button>
                    <button type="submit">Edytuj</button>
                </div>
            </form>
        </Dialog>
    )
}
