const zipLinks=document.getElementsByClassName("zip-link-item");for(let i=0;i<zipLinks.length;i++)zipLinks[i].childNodes[0].id.includes("_")?zipLinks[i].setAttribute("href",zipLinks[i].childNodes[0].id.slice(0,zipLinks[i].childNodes[0].id.indexOf("_"))+".html"):zipLinks[i].setAttribute("href",zipLinks[i].childNodes[0].id+".html");