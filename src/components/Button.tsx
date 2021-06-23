import { ButtonHTMLAttributes } from 'react'

// Um Botão que aceita uma id, tanto quando a id de outro botão 
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
    return (
        <button className="button" {...props} />
    );
}
