import { ButtonHTMLAttributes } from 'react'

import '../styles/button.scss'

// Um Botão que aceita uma id, tanto quando a id de outro botão 
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean 
};

export function Button({ isOutlined = false, ...props}: ButtonProps) {
    return (
        <button className={`special-button ${ isOutlined && "outlined"} }`} {...props} />
    );
}
