import React from 'react'

interface ILogoImageProps {
    size: number
    color: string
}

const SvgLogo: React.FC<ILogoImageProps> = props => {
    const { size, color } = props

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <rect
        x='8'
    y='11'
    width='8'
    height='6'
    strokeWidth='1'
    />
    <line x1="8" y1="11" x2="12" y2="14" strokeWidth='1'></line>
        <line x1="12" y1="14" x2="16" y2="11" strokeWidth='1'></line>
        </svg>
)
}

export default SvgLogo