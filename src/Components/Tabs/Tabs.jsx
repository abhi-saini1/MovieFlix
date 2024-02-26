import React, { useState } from 'react'
import './style.scss';

const Tabs = ({data,onTabChange}) => {
    const [selectTab,setSelectTab] = useState(0);
    const [left,setLeft] = useState(0);

    const activeTab = (tab,i)=>{
        setLeft(i * 100)
        setTimeout(()=>{
            setSelectTab(i)
        },300)
        onTabChange(tab,i)
    }
  return (
    <div className='tabs'>
        <div className="tab-items">
            {data?.map((tab,i)=>(
                <span key={i}  className={`tab-item ${selectTab === i ? 'acitve' : ''}`} onClick={()=> activeTab(tab,i)}>
                    {tab}
                </span>
            ))}
              <span className='moving' style={{left}}>
            </span>
        </div>
    </div>
  )
}

export default Tabs