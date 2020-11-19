import React, { useState, useEffect } from "react";
import { FaCircle, FaQuestionCircle, FaHeart } from "react-icons/fa";

const PhotoItem = ({ item, getFavorite, favoriteGroup, getFavoriteGroup }) => {
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		setRefresh(true);
	}, []);

	if (refresh) {
		favoriteGroup.find((el) => {
			if ((el.id === item.id) & (el.albumId === item.albumId)) {
				let heart = document.querySelector(
					`.item-${item.albumId}-${item.id}`
				);

				heart.classList.add("favorite");
			}
		});
	}

	return (
		<div className="card">
			<div className="card-inner">
				<div className="card-front">
					<img src={item.url} alt="" />
				</div>
				<div className="card-back">
					<h1 className="card-back-title">
						<span>{item.id}</span>
						<span
							onClick={() => {
								let heart = document.querySelector(
									`.item-${item.albumId}-${item.id}`
								);

								if (heart.classList.contains("favorite")) {
									heart.classList.remove("favorite");

									let array = [];
									favoriteGroup.find((el) => {
										if (
											(el.id === item.id) &
											(el.albumId === item.albumId)
										) {
											return false;
										} else {
											array.push(el);
										}
									});

									getFavoriteGroup(array);
								} else {
									heart.classList.add("favorite");
									getFavorite(item);
								}
							}}
						>
							<FaHeart
								className={`item-${item.albumId}-${item.id}`}
							/>
						</span>
					</h1>
					<ul>
						<li>
							<strong>Title:</strong> {item.title}
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default PhotoItem;
