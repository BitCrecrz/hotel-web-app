import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

export default function BasicSelect() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="selction-holder">
      <Box display={"flex"} margin={"18px"}>
        {/* // input for city */}
        <TextField
          id="City"
          label="Enter The City"
          variant="outlined"
          fullWidth
        />
        {/* input for check in date */}
        <TextField
          id="checkin"
          label="Check In Date"
          variant="outlined"
          type="date"
          fullWidth
        />
        <TextField
          id="checkout"
          label="Check Out Date"
          variant="outlined"
          type="date"
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Guests</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Add Guest"
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
          </Select>
        </FormControl>
        <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold px-5 py-0 lg:ml-16 rounded-full ">
          <i className="fas fa-search"></i>
        </button>
      </Box>
    </div>
  );
}
