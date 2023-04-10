import instance from "@/allApi/axios";

export const userDetails = async (dispatch) => {
  try {
    dispatch({ type: "UserRequest" });
    const { data } = await instance.get("loginApis", {
      withCredentials: true,
    });
    dispatch({ type: "UserSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "UserFail", payload: error.response });
  }
};

export const mediawithcity = (category_name, city_name) => async (dispatch) => {
  try {
    dispatch({ type: "MediaWithCityRequest" });
    const { data } = await instance.post(`medias`, {
      category_name,
      city_name,
    });
    dispatch({ type: "MediaWithCitySuccess", payload: data });
  } catch (error) {
    dispatch({ type: "MediaWithCityFail", payload: error.data });
  }
};

export const mediawithlocation =(category_name, city_name, loca, noOfLogo) => async (dispatch) => {
    try {
      dispatch({ type: "MediaWithCityRequest" });
      const { data } = await instance.put(`team`, {
        category_name,
        city_name,
        loca,
        noOfLogo,
      });
      dispatch({ type: "MediaWithCitySuccess", payload: data });
    } catch (error) {
      dispatch({ type: "MediaWithCityFail", payload: error.response.data });
    }
  };

export const priceSubIllu =
  (category_name, price, illumination, table, city, locations) =>
  async (dispatch) => {
    try {
      dispatch({ type: "MediaWithCityRequest" });

      const { data } = await instance.post(`filters`, {
        category_name,
        price,
        illumination,
        table,
        city,
        locations,
      });

      dispatch({ type: "MediaWithCitySuccess", payload: data });
    } catch (error) {
      dispatch({ type: "MediaWithCityFail", payload: error.response.data });
    }
  };

export const mediaFilters =
  (category_name, illunation, categorys, city_name, locationCkheckbox) =>
  async (dispatch) => {   
    try {
      dispatch({ type: "MediaWithCityRequest" });
      const { data } = await instance.put(`filters`, {
        category_name,
        illunation,
        categorys,
        city_name,
        locationCkheckbox,
      });

      dispatch({ type: "MediaWithCitySuccess", payload: data });
    } catch (error) {
      dispatch({ type: "MediaWithCityFail", payload: error.response.data });
    }
  };

export const iconFiltersData =
  (distance, datas, table, city, minLatitude, maxLatitude, uniqueValues) =>
  async (dispatch) => {
    try {
      dispatch({ type: "IconFilterRequest" });

      const { data } = await instance.patch(`filters`, {
        distance,
        datas,
        table,
        city,
        minLatitude,
        maxLatitude,
        uniqueValues,
      });
      
      dispatch({ type: "IconFilterSuccess", payload: data });
    } catch (error) {
      dispatch({ type: "IconFilterFail", payload: error.response.data });
    }
  };

export const cartitems = () => async (dispatch) => {
  try {
    dispatch({ type: "CartRequest" });
    const { data } = await instance.get(`cart`);
    dispatch({ type: "CartSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "CartFail", payload: error.response.data });
  }
};

export const addItem = (mediaid, mediatype) => async (dispatch) => {
  try {
    dispatch({ type: "CartRequest" });

    const { data } = await instance.put(`cart`, {
      mediaid,
      mediatype,
    });
    dispatch({ type: "CartSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "CartFail", payload: error.response.data });
  }
};

export const removeItem = (code) => async (dispatch) => {
  try {
    dispatch({ type: "CartRequest" });

    const { data } = await instance.patch(`cart`, { code });
    dispatch({ type: "CartSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "CartFail", payload: error.response.data });
  }
};

export const singlemnedia = (meta_title, category_name) => async (dispatch) => {
  try {
    dispatch({ type: "MediaWithCityRequest" });
    const { data } = await instance.post("seedetails", {
      meta_title,
      category_name,
    });
    dispatch({ type: "MediaWithCitySuccess", payload: data });
  } catch (error) {
    dispatch({ type: "MediaWithCityFail", payload: error.response.data });
  }
};

export const nearProduct =
  (code, category_name) => async (dispatch) => {
    try {
      dispatch({ type: "MediaWithCityRequest" });
      const { data } = await instance.patch("enquiries", {
        code,
        category_name,

      });
      dispatch({ type: "MediaWithCitySuccess", payload: data });
    } catch (error) {
      dispatch({ type: "MediaWithCityFail", payload: error.response.data });
    }
  };

export const markersPosition =
  (NorthLat, SouthLat, NorthLong, SouthLong) => async (dispatch) => {
    try {
      dispatch({ type: "MediaWithCityRequest" });
      const { data } = await instance.post("team", {
        NorthLat,
        SouthLat,
        NorthLong,
        SouthLong,
      });
      dispatch({ type: "MediaWithCitySuccess", payload: data });
    } catch (error) {
      dispatch({ type: "MediaWithCityFail", payload: error.response.data });
    }
  };
