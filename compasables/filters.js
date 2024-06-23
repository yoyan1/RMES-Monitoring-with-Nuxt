const useFilters = () => {

    function toFullname(data) {
        return `${data.firstname} ${data.middlename} ${data.lastname}`
    }

    function toAddress(data) {
        return `${data.street} ${data.brgy} ${data.city}`
    }
    
    return {toFullname, toAddress}
}

export default useFilters;