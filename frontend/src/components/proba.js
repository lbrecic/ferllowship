<Header />
          <div className="geo-color adminBody">
            <div className="adminProfileInfo">
              <div className="adminPicture">
                <img
                  src={this.state.photoLink}
                  alt="logo"
                  className="box-shadow"
                />
              </div>

              <div className="logo-title">
                <span className="logo-title-light profileName">
                  {this.state.username}
                </span>
                <span className="logo-title-light email">
                  {this.state.email}
                </span>
                <br />
                <span className="logo-title-light title">
                  Administrator
                </span>
                <br />
              </div>

              <div className="adminBtns">
                <SubmitButton
                  className="adminBtn"
                  text="Show all users"
                  onClick={() => this.showAllUsersWindow(1)}
                />
                <SubmitButton
                  className="adminBtn"
                  text="Promote someone to admin"
                  onClick={() => this.showPromoteWindow(1)}
                />
                <SubmitButton
                  className="adminBtn"
                  text="Location requests"
                  onClick={() => this.showLocationRequestsWindow(1)}
                />
              </div>
            </div>
            <div className="adminLinks">
              <div className=" text-center link ">
                <Link to="/deck">
                  <div className="flex justify-center">
                    <img src={cards} className="karte" alt="logo" />
                  </div>
                  <span className="logo-title-light textKarte">My cards</span>
                </Link>
              </div>

              <div className="text-center link ">
                <Link to="/stats">
                  <div className="flex justify-center">
                    <img src={stats} className="statistika" alt="logo" />
                  </div>
                  <span className="logo-title-light textStatistika">
                    My statistics
                  </span>
                </Link>
              </div>

              {/* <p className=" white">
                <button
                  className="btnLogout btnEdit"
                  onClick={(e) => {
                    this.showEditWindow();
                  }}
                >
                  Uredi profil
                </button>
                <EditProfile
                  show={this.state.showEdit}
                  onClose={() => this.onCloseEdit()}
                />
              </p> */}
            </div>

            <div className="w-1/4 form geo-color adminForm">
              <div className="h-12"></div>
              <CartographRequests
                setShow={this.setCartographRequest}
                setRequest={this.setCartographRequest}
              />
            </div>
            {this.allUsersWindow === 1 && (
              <AllUsersWindow setShow={this.showAllUsersWindow} />
            )}
            {this.promoteWindow === 1 && (
              <PromoteAdmin setShow={this.showPromoteWindow} />
            )}
            {this.locationRequestsWindow === 1 && (
              <LocationRequestsAdmin setShow={this.showLocationRequestsWindow} />
            )}
            {this.showCartographRequest !== 0 && (
              <CartographRequest
                setShow={this.setShowCartographRequest}
                setRequest={this.setCartographRequest}
                request={this.cartographRequest}
              />
            )}
          </div>
        </>
      );