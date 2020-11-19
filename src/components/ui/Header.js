import React from "react";
import album from "../../img/album.png";

const Header = ({ getHome }) => {
	return (
		<header className="center">
			<img
				src={album}
				alt="album"
				onClick={() => {
					getHome(1, "");
				}}
			/>
		</header>
	);
};

export default Header;
