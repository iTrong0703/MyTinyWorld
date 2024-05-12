class RoomController {
    // GET /news
    index(req, res) {
        const buildingName = req.query.buildingname;
        console.log(buildingName);
        const url = new URL('http://localhost:8080/rooms/getall');
        const add_params = { buildingname: buildingName, };
        const new_params = new URLSearchParams([
            ...Array.from(url.searchParams.entries()), ...Object.entries(add_params),
        ]).toString();
        const urlParam = new URL(`${url.origin}${url.pathname}?${new_params}`);
        fetch(urlParam, {
            method: 'get',
            headers: {
                Accept: 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((json) => {
                const rooms = json.data[0].roomInfo;
               
                res.render('rooms_table', 
                    { 
                    rooms: rooms,
                    buildingName: buildingName 
                    });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send(err.message);
            });
        
    }

    getEditRoom(req, res) {
        const buildingName = req.query.buildingname;
        const roomindex = req.query.roomindex;
        console.log(buildingName);
        const url = new URL('http://localhost:8080/rooms/getbyindex');
        const add_params = { buildingname: buildingName, roomindex: roomindex };
        const new_params = new URLSearchParams([
            ...Array.from(url.searchParams.entries()), ...Object.entries(add_params),
        ]).toString();
        const urlParam = new URL(`${url.origin}${url.pathname}?${new_params}`);
        fetch(urlParam, {
            method: 'get',
            headers: {
                Accept: 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((json) => {
                const rooms = json.data;
                console.log("đây là phòng"+ rooms);
                res.render('edit_room', 
                    { 
                    rooms: rooms,
                    buildingName: buildingName 
                    });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send(err.message);
            });
        
    }

    getEditInvoice(req, res) {
        res.render('edit_invoice');
    }

}

module.exports = new RoomController; 
