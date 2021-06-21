import { useState } from "react"

// Um Botão que aceita uma id, tanto quando a id de outro botão 
type ButtonProps = {
    id: string;
    other_id: string;
}

export function Button(props: ButtonProps) {
    const [value, setValue] = useState("-")

    // Só uma coisinha que eu fiz pra testar os states
    function change(){
        // se uma setinha for igual a outra essa não se move
        let other_button = document.getElementById(props.other_id)
        console.log(other_button)
        if ( other_button?.innerText !== value) {
            setValue("->")
        }
        else {
            setValue("<-")
        }
    }

    return (
        <button id={props.id} onClick={change}>
            {value}
        </button>
    );
}