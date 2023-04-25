import { latLongApi } from "@/allApi/apis";
import React,{useState} from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

function SearchGoogle({setSearch, search})  {
  const [address, setAddress] = useState("");
 

  const handleSelect = async(value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    const latitude = latLng.lat
    const longitude = latLng.lng
    if(latitude && longitude){

      const data = await latLongApi(latitude,longitude)
     setSearch()
      setSearch(data);
    }

  };

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input className="w-100" {...getInputProps({ placeholder: "Type address" })} />
            <div>
              {loading ? <div>...loading</div> : null}
              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}

export default SearchGoogle;