import styled from 'styled-components';
import { Theme } from '../utils/constants';

// Header
export const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  height: ${Theme.headerHeight};
  padding: 0 ${Theme.rlPadding};
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.7);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const LogoSection = styled.a`
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: #1d1d1f;
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const ActionLink = styled.a`
  font-size: 13px;
  font-weight: 500;
  color: #424245;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: ${Theme.mainColor};
  }
`;

export const StatusText = styled.span`
  font-size: 13px;
  font-weight: 400;
  color: #86868b;
`;

// Nav
export const StyledNav = styled.nav`
  width: auto;
  height: ${Theme.navHeight};
  padding: 0px ${Theme.rlPadding};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  align-content: center;
  border-bottom: 1px solid ${Theme.borderColor};
`;
export const StyledNavItemWrap = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  gap: 20px;
`;
export const StyledNavItem = styled.li`
  margin: 0;
  padding: 0;
  min-width: 50px;
`;
export const StyledNavItemIink = styled.a`
  font-size: 14px;
  color: ${Theme.mainColor};

  &:hover {
    font-weight: bold;
  }
`;

// Content
export const StyledMain = styled.main`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;
export const StyledArticle = styled.article`
  width: 100%;
  height: 100%;
  overflow: auto;
  overflow-anchor: none;
`;
export const StyledContent = styled.section`
  width: 100%;
  min-height: calc(100% - ${Theme.footerHeight});
  padding: 24px ${Theme.rlPadding};
  box-sizing: border-box;
`;

// Footer
export const StyledFooter = styled.footer`
  width: auto;
  height: ${Theme.footerHeight};
  border-top: 1px solid ${Theme.borderColor};
  box-sizing: border-box;
  font-size: 12px;
  color: gray;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// page
export const LoginLayout = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;
