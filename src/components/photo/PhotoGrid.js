import React, { useState, useEffect } from "react";
import PhotoItem from "./PhotoItem";
import Loading from "../ui/Loading";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const PhotoGrid = ({
	items,
	isLoading,
	firstGroup,
	getPage,
	page,
	query,
	currentQueryGroup,
	status,
	local,
}) => {
	const [currentGroup, setCurrentGroup] = useState(firstGroup);
	const [favorite, setFavorite] = useState([]);
	const [favoriteGroup, setFavoriteGroup] = useState([]);
	const [albumId, setAlbumId] = useState(1);

	useEffect(() => {
		let array = [];
		let id;
		items.find((index) => {
			if (index.albumId === page) {
				array.push(index);
				id = index.albumId;
			}
		});
		setAlbumId(id);
		if (id === 1) {
			setCurrentGroup(firstGroup);
		} else {
			setCurrentGroup(array);
		}
	}, [page]);

	useEffect(() => {
		let local = localStorage.getItem("favoriteGroup");
		local = local ? JSON.parse(local) : [];

		setFavorite(local);
		setFavoriteGroup(local);
	}, []);

	const getFavorite = (f) => {
		favorite.push(f);
		setFavoriteGroup(favorite);
		localStorage.setItem("favoriteGroup", JSON.stringify(favorite));
	};

	const getFavoriteGroup = (fg) => {
		let array = fg;
		setFavorite(array);
		setFavoriteGroup(array);
		localStorage.setItem("favoriteGroup", JSON.stringify(array));
	};

	const next = () => {
		getPage(page + 1);
	};

	const prev = () => {
		getPage(page - 1);
	};

	return isLoading ? (
		<Loading />
	) : (
		<div className="grid">
			<div className="buttons">
				{page === 1 ? (
					<button className="prev hidden" onClick={prev}>
						<FaArrowCircleLeft />
					</button>
				) : (
					<button className="prev" onClick={prev}>
						<FaArrowCircleLeft />
					</button>
				)}
				{(query.length > 0) &
				(typeof currentQueryGroup !== "undefined") ? (
					currentQueryGroup.length < 50 ? (
						<span></span>
					) : (
						<button className="next" onClick={next}>
							<FaArrowCircleRight />
						</button>
					)
				) : currentGroup.length <= 50 ? (
					status || albumId === 100 ? (
						local.length < 50 ? (
							<span></span>
						) : (
							<button className="next" onClick={next}>
								<FaArrowCircleRight />
							</button>
						)
					) : (
						<button className="next" onClick={next}>
							<FaArrowCircleRight />
						</button>
					)
				) : (
					<button className="next" onClick={next}>
						<FaArrowCircleRight />
					</button>
				)}
			</div>

			{query.length > 0 ? (
				typeof currentQueryGroup !== "undefined" ? (
					<section className="cards">
						{currentQueryGroup.map((item) => (
							<PhotoItem
								item={item}
								key={item.id}
								getFavorite={(f) => {
									getFavorite(f);
								}}
								getFavoriteGroup={(fg) => {
									getFavoriteGroup(fg);
								}}
								favoriteGroup={favoriteGroup}
							/>
						))}
					</section>
				) : (
					<section className="notfound">
						<h2>Procura não encontrada!</h2>
					</section>
				)
			) : status ? (
				local.length > 0 ? (
					<section className="cards">
						{local.map((item) => (
							<PhotoItem
								item={item}
								key={item.id}
								getFavorite={(f) => {
									getFavorite(f);
								}}
								getFavoriteGroup={(fg) => {
									getFavoriteGroup(fg);
								}}
								favoriteGroup={favoriteGroup}
							/>
						))}
					</section>
				) : (
					<section className="notfound">
						<h2>Procura não encontrada!</h2>
					</section>
				)
			) : (
				<section className="cards">
					{currentGroup.map((item) => (
						<PhotoItem
							item={item}
							key={item.id}
							getFavorite={(f) => {
								getFavorite(f);
							}}
							getFavoriteGroup={(fg) => {
								getFavoriteGroup(fg);
							}}
							favoriteGroup={favoriteGroup}
						/>
					))}
				</section>
			)}
		</div>
	);
};

export default PhotoGrid;
