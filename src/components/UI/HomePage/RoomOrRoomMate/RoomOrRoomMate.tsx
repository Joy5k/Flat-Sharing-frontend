import { Box, Divider } from "@mui/material";

const RoomOrRoomMate=()=>{
    return(
        <div>
            <Divider>Looking For</Divider>
            <div className="flex flex-col md:flex-row lg:flex-row justify-center gap-10 mb-20 mt-10">
                <div className="w-fit border border-gray-200 border-dashed p-20 flex flex-col gap-5 text-center">
                    <p className="text-3xl text-sky-800" >Need a room?</p>
                   <p className="text-sky-800">Post a free Room Wanted ad and make sure <br /> people with rooms can find you.</p>

                </div>
                <div className="w-fit border border-gray-200 border-dashed p-20 flex flex-col gap-5 text-center">
                    <p className="text-3xl text-sky-800" >Got a room to let? </p>
                   <p className="text-sky-800">Post a free ad and rent your room in days. <br />
                   Find out more</p>

                </div>
            </div>
        </div>
    )
}
export default RoomOrRoomMate;