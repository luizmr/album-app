import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/ui/Header";
import Search from "./components/ui/Search";
import PhotoGrid from "./components/photo/PhotoGrid";
import "./App.css";

const App = () => {
	const [items, setItems] = useState([]);

	const [isLoading, setIsLoading] = useState(true);

	const [query, setQuery] = useState("");

	const [page, setPage] = useState(1);

	const [search, setSearch] = useState(false);

	const [firstGroup, setFirstGroup] = useState();

	const [currentQueryGroup, setCurrentQueryGroup] = useState([]);

	const [status, setStatus] = useState(false);

	useEffect(() => {
		const fetchItems = async () => {
			// get characters from api
			const result = await axios(
				`https://jsonplaceholder.typicode.com/photos`
			);

			setItems(result.data);

			let array = [];

			result.data.find((index) => {
				if (index.albumId === 1) {
					array.push(index);
				}
			});

			setFirstGroup(array);

			// not loading anymore, so it is false
			setIsLoading(false);
		};

		fetchItems();
	}, []);

	useEffect(() => {
		if ((query.length > 0) & !status) {
			filterArray(items, query, page);
		} else if ((query.length > 0) & status) {
			let local = localStorage.getItem("favoriteGroup");
			local = local ? JSON.parse(local) : [];

			filterArray(local, query, page);
		} else if ((query.length === 0) & status) {
			let local = localStorage.getItem("favoriteGroup");
			local = local ? JSON.parse(local) : [];

			let arrays = [];
			while (local.length > 0) {
				arrays.push(local.splice(0, 50));
			}

			setCurrentQueryGroup(arrays[page - 1]);
		} else {
			setCurrentQueryGroup([]);
		}
	}, [query, status, page]);

	const filterArray = (main, q, p) => {
		let arrayFilter = [];
		main.find((el, i) => {
			if (el.title.toLowerCase().indexOf(q) > -1) {
				arrayFilter.push(el);
			}
		});

		let arrays = [];
		while (arrayFilter.length > 0) {
			arrays.push(arrayFilter.splice(0, 50));
		}

		setCurrentQueryGroup(arrays[p - 1]);
	};

	const local = (p) => {
		let local = localStorage.getItem("favoriteGroup");
		local = local ? JSON.parse(local) : [];
		let arrays = [];
		while (local.length > 0) {
			arrays.push(local.splice(0, 50));
		}

		let newLocal = arrays[p - 1] != undefined ? arrays[p - 1] : [];

		return newLocal;
	};

	useEffect(() => {
		local(page);
	}, [page]);

	return (
		<div className="container">
			<Header
				getHome={(p, q) => {
					setPage(p);
					setQuery(q);
					setSearch(false);
					setStatus(false);
				}}
			/>

			<Search
				getQuery={(q) => setQuery(q)}
				getPage={(p) => setPage(p)}
				getSearch={(s) => setSearch(s)}
				getStatus={(st) => setStatus(st)}
				search={search}
				status={status}
			/>

			{firstGroup && (
				<PhotoGrid
					isLoading={isLoading}
					items={items}
					firstGroup={firstGroup}
					getPage={(p) => setPage(p)}
					page={page}
					query={query}
					currentQueryGroup={currentQueryGroup}
					local={local(page)}
					status={status}
				/>
			)}
		</div>
	);
};

export default App;
