exports.home = ( req, res ) => {
    res.status( 200 ).send({
        success : true,
        message : `Welcome to Drone Manager Backend !!`
    })
}