import React, { FC, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import User from "../../interfaces/User";

export interface HeaderProps {
  currentUser?: User | null;
  onLogout?(): void;
  onShowAuthModal?(): void;
}

export const Header: FC<HeaderProps> = ({
  currentUser = null,
  onLogout,
  onShowAuthModal,
}) => {
  const handleLogout = useCallback(() => {
    if (onLogout) {
      onLogout();
    }
  }, [onLogout]);

  const handleShowAuthModal = useCallback(() => {
    if (onShowAuthModal) {
      onShowAuthModal();
    }
  }, [onShowAuthModal]);

  return (
    <header className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
      <div className="offset-4 col-4 text-center">
        <Link className="blog-header-logo text-dark" to="/">
          Chess PWA
        </Link>
      </div>
      <div className="col-4 d-flex justify-content-end align-items-center">
        {currentUser ? (
          <>
            <div className="mr-3">Hi, {currentUser.fullName}</div>
            <Button
              className="btn btn-sm btn-danger mr-3"
              data-testid="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            className="btn btn-sm btn-success mr-3"
            data-testid="login-btn"
            onClick={handleShowAuthModal}
          >
            Login / Register
          </Button>
        )}

        <a
          href="https://github.com/ildar-icoosoft/chess-pwa"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`${process.env.PUBLIC_URL}/imgs/GitHub-Mark-32px.png`}
            alt=""
          />
        </a>
      </div>
    </header>
  );
};
