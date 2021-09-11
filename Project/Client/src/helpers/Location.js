const Location = (() => {
    let provinces = undefined
    let districts = undefined
    let communes = undefined
    const getProvince = async () => {
        provinces = await (await fetch('/local/local.json')).json();
        return provinces.map(item => ({ id: item.id, name: item.name }))
    }

    const getDistricts = (provinceId) => {
        if (provinces === undefined) return []
        try {
            districts = provinces.find(item => item.id === provinceId).districts
            return districts.map(item => ({ id: item.id, name: item.name }))
        } catch {
            return []
        }
    }

    const getCommunes = (districtId) => {
        if (districts === undefined) return []
        try {
            communes = districts.find(item => item.id === districtId).wards
            return communes.map(item => ({ id: item.id, name: item.name }))
        }catch {
            return []
        }
    }

    const getLocationString = (provideID, districtID, communeID) => {
        const province = provinces.find(item => item.id === provideID).name
        const district = districts.find(item => item.id === districtID).name
        const commune = communes.find(item => item.id === communeID).name
        return `${commune}, ${district}, ${province}, Vietnam`
    }

    return {
        getProvince,
        getDistricts,
        getCommunes,
        getLocationString
    }
})();

export default Location