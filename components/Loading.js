import { CubeGrid } from 'better-react-spinkit';

function Loading() {
    return (
        <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
            <div>
                <img 
                    src="https://media.istockphoto.com/vectors/lightning-flash-discharge-of-electricity-on-transparent-background-vector-id1127540861?k=6&m=1127540861&s=170667a&w=0&h=5T0k3Dc3pkG_ETlNqb8wA8A2hLeIKM8C53RUOWfdaTM=" 
                    alt=""
                    style={{ marginBottom: 15 }}
                    height={100}
                />
                <CubeGrid color="#00f7f3" size={50} />
            </div>
        </center>
    )
}

export default Loading;


