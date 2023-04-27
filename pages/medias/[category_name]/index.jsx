import Fixednavbar from '@/components/navbar/fixednavbar';
import React,{useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import styles from '../../../styles/mediaN.module.scss'
import { Dropdown, DropdownButton } from "react-bootstrap";
import { CityNameImage, mediaApi } from "@/allApi/apis";

const Media = () => {
  const router = useRouter()
  const [serviceIcon, setServiceIcon] = useState(CityNameImage);
  const [data,setData] = useState([])
  const {category_name} = router.query;
  const SelectServc = async(id) =>{
    const services =[...serviceIcon];
    services.map((el)=>{
      if(el.id==id){
        el.value2=true;
        
      }
      if(el.id !==id){
        el.value2=false;
        
      }
    })
    setServiceIcon(services);

  }
  let slice;
  if (data) {
    slice = data.slice(0, 16);
  }
console.log(slice);
  const getData = async() =>{
    const data =  await mediaApi(category_name)

    setData(data)
  }

  useEffect(() =>{
getData()
  },[category_name])
  return (
    <>
    <Fixednavbar/>
    <div className=" container-xxl  container-xl container-lg container-md my-5 pt-5 ">
      {/* <h1 className={`text-center my-3 ${styles.heading}`}>Services We Offer</h1> */}

      <section className={`my-5 p-2 ${styles.service} d-flex text-center`}>
      {serviceIcon.map((el,i) => (
        
          <span className={`text-center ms-3 me-3 ${styles.service_Icon_cnt}`}  key={i} onClick={()=>SelectServc(el.id)}>
             <img className={`${styles.service_Icon} mb-2`} src={el.value2==true ?el.srcImgCtSlc:el.srcImgCt} alt={el.srcImg} />
             <h6 aria-expanded={el.value2} >{el.label}</h6>
          </span>
      ))}
      </section>
         <h1 className={` my-3 ${styles.heading}`}>AIRPORT BRANDING</h1>
      <section className={` p-2 ps-0 my-3  ${styles.filter_section} d-flex media-filter-drop`}>


{/* Search input */}
<form>
  <input class={styles.nosubmit} type="search" placeholder="Search Cities"/>
</form>


  {/* Illumination type  */}

      <DropdownButton
        title="Select Type"
        id={styles.select_media_box}
        // onSelect={(e) => setUserType(e)}
        drop="down-centered"
      >
        {/* {ILLUMINATION.map((el, i) => ( */}
          <Dropdown.Item
          // key={i}
            className="p-2 mt-0 "
            // onClick={(e) => mediaTypeFilter(el)}
          >
            {/* {el} */}
          </Dropdown.Item>
        {/* ))} */}
      </DropdownButton>


  {/* City */}

  <DropdownButton
        title="Location"
        id={styles.select_media_box}
        // onSelect={(e) => setUserType(e)}
        drop="down-centered"
      >
        {/* {ILLUMINATION.map((el, i) => ( */}
          <Dropdown.Item
          // key={i}
            className="p-2 mt-0 "
            // onClick={(e) => mediaTypeFilter(el)}
          >
            {/* {el} */}
          </Dropdown.Item>
        {/* ))} */}
      </DropdownButton>


      {/* Media type */}

  <DropdownButton
        title="Media Type"
        id={styles.select_media_box}
        // onSelect={(e) => setUserType(e)}
        drop="down-centered"
      >
        {/* {ILLUMINATION.map((el, i) => ( */}
          <Dropdown.Item
          // key={i}
            className="p-2 mt-0 "
            // onClick={(e) => mediaTypeFilter(el)}
          >
            {/* {el} */}
          </Dropdown.Item>
        {/* ))} */}
      </DropdownButton>  
      </section>
    </div>
    </>
  );
}

export default Media;
