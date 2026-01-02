import styled from 'styled-components';

export const CommonTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: #1d1d1f;
  font-family: 'Inter', -apple-system, sans-serif;
`;

export const CommonSubTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 16px;
  color: #b1b1b1;
  font-family: 'Inter', -apple-system, sans-serif;
`;

export const CommonImage = styled.img``;

export const CommonButton = styled.button`
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

export const CommonForm = styled.form`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CommonInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 16px;
  border: 1px solid #d2d2d7;
  background: #f5f5f7;
  font-size: 16px;
`;

export const CommonInputText = styled.p`
  font-size: 13px;
  font-weight: 400;
  line-height: 1.6;
  color: red;
`;
