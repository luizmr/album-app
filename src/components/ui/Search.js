import React, { useState, useEffect } from "react";

const Search = ({
	getQuery,
	getPage,
	search,
	getSearch,
	getStatus,
	status,
}) => {
	const [text, setText] = useState("");

	useEffect(() => {
		if (status === false) {
			document.getElementById("one").checked = false;
		}
		if (search === false) {
			setText("");
		}
	}, [search, status]);

	const onChange = (q) => {
		setText(q);
		getQuery(q);
		getPage(1);
		getSearch(true);
		if (q === "") {
			getSearch(false);
		}
	};

	const checkFavorites = () => {
		if (document.getElementById("one").checked === false) {
			getStatus(false);

			getPage(1);
		} else {
			getStatus(true);

			getPage(1);
		}
	};

	return (
		<section className="search">
			<form>
				<input
					type="text"
					placeholder="Buscar fotos ..."
					className="form-control"
					value={text}
					onChange={(e) => onChange(e.target.value)}
					autoFocus
				/>
			</form>
			<div className="boxes">
				<div className="box">
					<input id="one" type="checkbox" onChange={checkFavorites} />
					<span className="check red"></span>
					<label htmlFor="one" className="labelone">
						Favoritos
					</label>
				</div>
				<span></span>
			</div>
		</section>
	);
};

export default Search;
