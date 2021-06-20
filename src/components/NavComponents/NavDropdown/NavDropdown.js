import "./NavDropdown.css";

export default function NavDropdown(props) {
	const { id, value, handleChange, options, label } = props;
	const getOptions = () => {
		const optionVals = [];
		for (let key in options) {
			optionVals.push(
				<option key={key} value={key}>
					{options[key]}
				</option>
			);
		}
		return optionVals;
	};
	return (
		<>
			<label className="NavDropdown-label" htmlFor={id}>
				{`${label}:`}
			</label>
			<span className="NavDropdown">
				<select id={id} value={value} onChange={handleChange}>
					{getOptions()}
				</select>
			</span>
		</>
	);
}
