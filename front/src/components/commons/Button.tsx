import styled from 'styled-components';

export const Button = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  border: none;
  background: #0071e3;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #0077ed;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 113, 227, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #d2d2d7;
    cursor: not-allowed;
  }
`;

export default Button;
