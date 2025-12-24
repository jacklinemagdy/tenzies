import type { JSX } from "react"

type DieProps = {
    value: number,
    isHeld: boolean,
    hold: () => void

}

export default function Die({ value, isHeld, hold }: DieProps): JSX.Element {
    const styles = {
        backgroundColor: isHeld ? "#59E391" : "white"
    }
    return (
        <button
            style={styles}
            onClick={hold}
        >
            {value}
        </button>
    )
}

