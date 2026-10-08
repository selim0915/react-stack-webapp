import styled, { css } from 'styled-components';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'text';
}

export const Button = styled.button<ButtonProps>`
  width: ${(props) => (props.variant === 'text' ? 'auto' : '100%')};
  padding: ${(props) => (props.variant === 'text' ? '0' : '16px')};
  border-radius: 12px;
  border: none;
  font-size: ${(props) => (props.variant === 'text' ? 'inherit' : '16px')};
  font-weight: ${(props) => (props.variant === 'text' ? 'normal' : '600')};
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) =>
    props.variant === 'text'
      ? css`
          background: transparent;
          color: inherit;
          &:hover {
            text-decoration: underline;
          }
          &:active {
            transform: none;
          }
        `
      : css`
          background: #0071e3;
          color: white;
          &:hover {
            background: #0077ed;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 113, 227, 0.3);
          }
          &:active {
            transform: translateY(0);
          }
        `}

  &:disabled {
    background: ${(props) => (props.variant === 'text' ? 'transparent' : '#d2d2d7')};
    color: ${(props) => (props.variant === 'text' ? '#999' : 'white')};
    cursor: not-allowed;
  }
`;

export default Button;
