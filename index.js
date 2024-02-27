const Express = require("express");
const bodyParser = require("body-parser");
var admin = require("firebase-admin");

//var serviceAccount = require("./reactnativepushapp-75f35-firebase-adminsdk-2vl1u-a9c47bf51b.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let token;

const app = new Express();
const router = Express.Router();

app.use(bodyParser.json());
app.use("/", router);

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


const eveniment=[
  {
    "action": "new",
    "id": 137,
    "eventCode": "FQXXOSS0031I",
    "service": "none",
    "severity": "informational",
    "eventClass": "network",
    "source": {},
    "targetResource": {
      "id": "4163AB96FC7859B1C4A5ACB3A6EEDF77",
      "type": "XClarity One",
      "name": "10.241.35.231"
    },
    "manager": {},
    "fruType": "other",
    "messageArgs": [
      "dmatula@lenovo.com",
      "10.64.95.228",
      "Cozma Alex"
    ],
    "_links": {
      "rel": "self",
      "uri": "/api/v1/monitoring/events/137"
    }
  },
  {
      "action": "new",
      "id": 138,
      "eventCode": "FQXXOSS0031I",
      "service": "none",
      "severity": "warning",
      "eventClass": "audit",
      "source": {},
      "targetResource": {
        "id": "4163AB96FC7859B1C4A5ACB3A6EEDF77",
        "type": "XClarity One",
        "name": "10.241.35.231"
      },
      "manager": {},
      "fruType": "other",
      "messageArgs": [
        "dmatula@lenovo.com",
        "10.64.95.228",
        "Cozma Alex"
      ],
      "_links": {
        "rel": "self",
        "uri": "/api/v1/monitoring/events/137"
      }
    },
    {
        "action": "new",
        "id": 139,
        "eventCode": "FQXXOSS0031I",
        "service": "none",
        "severity": "warning",
        "eventClass": "power",
        "source": {},
        "targetResource": {
          "id": "4163AB96FC7859B1C4A5ACB3A6EEDF77",
          "type": "XClarity One",
          "name": "10.241.35.231"
        },
        "manager": {},
        "fruType": "other",
        "messageArgs": [
          "dmatula@lenovo.com",
          "10.64.95.228",
          "Cozma Alex"
        ],
        "_links": {
          "rel": "self",
          "uri": "/api/v1/monitoring/events/137"
        }
      },
      {
          "action": "new",
          "id": 140,
          "eventCode": "FQXXOSS0031I",
          "service": "none",
          "severity": "warning",
          "eventClass": "",
          "source": {},
          "targetResource": {
            "id": "4163AB96FC7859B1C4A5ACB3A6EEDF77",
            "type": "XClarity One",
            "name": "10.241.35.231"
          },
          "manager": {},
          "fruType": "other",
          "messageArgs": [
            "dmatula@lenovo.com",
            "10.64.95.228",
            "Cozma Alex"
          ],
          "_links": {
            "rel": "self",
            "uri": "/api/v1/monitoring/events/137"
          }
        }

]

  //const appFilter = {"severity":["informational","critical"],"eventClass":["audit","other"]}
  //const appFilter = {"severity":["warning","critical"],"eventClass":["audit","other"]}
  //const appFilter = {"severity":["informational","warning","critical"],"eventClass":["audit","system"]}
  
  
  

  

const filterFunction = (event, appFilter) => {
    let send = true;
    Object.keys(appFilter).forEach(prop => {
        if (appFilter[prop].length !==0 && !appFilter[prop].includes(event[prop]) || appFilter['severity'].length === 0) send = false;
    })

    return send;

}

router.post("/register", (req, res) => {
        eveniment.forEach(e=> {
            console.log('Filter from body:',res.body)
            const appFilter = {"severity":["informational","warning","critical"],"eventClass":["audit","system"]}
            let newFilter=Object.assign({}, appFilter);
            newFilter.eventClass.map((a,k)=> {if (a==='system') {newFilter.eventClass[k]=e.eventClass}})
            newFilter = newFilter.eventClass.filter(i=> i !=='');
            console.log('NEW FILTER IS:',newFilter);
            if(filterFunction(e,newFilter)) {console.log(`The event ${e.id} will be sent`)} else {console.log(`The event ${e.id} won't be sent`)}
            
           
        })
    //}) 





    //console.log('Eveniment:',eveniment);
    //console.log('Filter:',filter);
    res.status(200).json({ message: "Successfully registered FCM Token!" });
});






router.post("/notifications", async (req, res) => {
    try {
        token = token;
        const { title, body, imageUrl } = req.body;
        token='e1G_AIW6T_KJj0Kd-wmpX7:APA91bG56WLuNnxfpVBU6kKEmeAJvT8Cr7WaW5H1ZqqwgPw0LVllAI8S0Rjyb9Wgk47BgEl0JdgVrHN0i4FprPiVaccpAJOt0zOjhC0B7cQo7zOHUvI-9JpF8OvBWa26C4u5bG9Dd2t6'
        await admin.messaging().send({
            token: token,
            data: {
                customData: "Daniel",
                id: "1",
                ad: "Dan Matula",
                subtitle: "Mesaj de pe Node.js"
            },
            android: {
                notification: {
                    body: "Push notification complex pentru date",
                    title: "Node Message",
                    color: "#fff566",
                    priority: "high",
                    sound: "default",
                    vibrateTimingsMillis: [200, 500, 800],
                    imageUrl: "https://plus.unsplash.com/premium_photo-1701075032615-1b6867a46d3c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
            }
        }).then((msg) => {
            console.log(msg)
        });
        res.status(200).json({ message: "Successfully sent notifications!" });
    } catch (err) {
        res
            .status(err.status || 500)
            .json({ message: err.message || "Something went wrong!" });
    }
});
