import DecryptedText from './DecryptedText';

let New3 = ({ text }) => {
    return (
        <div style={{ marginTop: '4rem' }}>
            <DecryptedText
                text={text}
                animateOn="view"
                revealDirection="center"
            />
        </div>
    )
}

export default New3;