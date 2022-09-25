import styled from 'styled-components';

const VoiceButtonBorder = () => {
  return (
    <VoiceBtnBorder>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 100 100">
        <defs>
          <linearGradient
            id="voiceBtnGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%">
            <stop offset="0%" stopColor="#AD24B9" />
            <stop offset="63%" stopColor="#9F10D1" />
            <stop offset="100%" stopColor="#571ADB" />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="51"
          r="40"
          stroke="url(#voiceBtnGradient)"
          strokeWidth="3"
          fill="none"
        />
      </svg>
    </VoiceBtnBorder>
  );
};

const VoiceBtnBorder = styled.div`
  position: absolute;
  animation: rotate 2s linear infinite;
  @keyframes rotate {
    100% {
      transform: rotate(1turn);
    }
  }
`;

export default VoiceButtonBorder;
