import { useEffect, useState } from 'react';

type Message = {
    type: 'info' | 'warn' | 'error' | 'success';
    text: string;
};

type MessageBoxProps = {
    message: Message | null;
    onClose: () => void;
};

function MessageBox({
                        message,
                        onClose
                    }: MessageBoxProps) {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (message) {
            setAnimate(true);
        }
    }, [message]);

    if (!message) return null;

    return (
        <div
            className={`message-box message-box-${message.type} ${
                animate ? 'show' : ''
            }`}
        >
            <i className="exit-button" onClick={onClose}>
                ✖
            </i>

            <span className="message-text">
                <strong>{message.type.toUpperCase()}:</strong>{' '}
                {message.text}
            </span>
        </div>
    );
}

export default MessageBox;