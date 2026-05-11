const logout = (e)=>{
    const token = localStorage.getItem("token");
    if(token)
    {
        localStorage.clear()
    }
}