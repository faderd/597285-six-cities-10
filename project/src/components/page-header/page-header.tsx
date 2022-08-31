import { memo } from 'react';
import Logo from '../logo/logo';
import UserMenu from '../user-menu/user-menu';

type PageHeaderProps = {
  isMainScreen?: boolean,
};

function PageHeader({ isMainScreen }: PageHeaderProps): JSX.Element {
  return (
    <header className="header" data-testid="page-header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo isMainScreen={isMainScreen} />
          </div>
          <nav className="header__nav">
            <UserMenu />
          </nav>
        </div>
      </div>
    </header>
  );
}

export default memo(PageHeader);
