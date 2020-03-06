import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Moment from 'react-moment';

function PlayerDetails(props) {
    const [data, setData] = useState({ hits: [] });
    const param = props.match.params.id;
    console.log(data);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://www.thesportsdb.com/api/v1/json/4013017/lookupplayer.php?id=' + param,
            );
            setData(result.data.players);
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {Object.keys(data).map((item, index) => (
                <React.Fragment key={index}>
                    {data[item].strFanart1 ?
                        <Image src={data[item].strFanart1} fluid /> :
                        <Image src={data[item].strThumb} fluid />
                    }
                    <br></br><br></br>
                    <Typography variant="h3" noWrap>{data[item].strPlayer}</Typography>
                    <br></br>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableBody>
                                <TableRow>
                                    <TableCell>Team</TableCell>
                                    <TableCell>{data[item].strTeam}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Position</TableCell>
                                    <TableCell>{data[item].strPosition}</TableCell>
                                </TableRow>
                                {data[item].strNumber ?
                                    <TableRow>
                                        <TableCell>Number</TableCell>
                                        <TableCell>{data[item].strNumber}</TableCell>
                                    </TableRow> : null}
                                <TableRow>
                                    <TableCell>Nationality</TableCell>
                                    <TableCell>{data[item].strNationality}</TableCell>
                                </TableRow>
                                {data[item].strWeight ?
                                    <TableRow>
                                        <TableCell>Height</TableCell>
                                        <TableCell>{data[item].strHeight}</TableCell>
                                    </TableRow> : null}
                                {data[item].strWeight ?
                                    <TableRow>
                                        <TableCell>Weight</TableCell>
                                        <TableCell>{data[item].strWeight}</TableCell>
                                    </TableRow> : null}
                                {data[item].strSigning ?
                                    <TableRow>
                                        <TableCell>Signing fee</TableCell>
                                        <TableCell>{data[item].strSigning}</TableCell>
                                    </TableRow> : null}
                                {data[item].dateSigned ?
                                    <TableRow>
                                        <TableCell>Date signed</TableCell>
                                        <TableCell><Moment format="D MMM YYYY" withTitle>{data[item].dateSigned}</Moment></TableCell>
                                    </TableRow> : null}
                                <TableRow>
                                    <TableCell>Date born</TableCell>
                                    <TableCell><Moment format="D MMM YYYY" withTitle>{data[item].dateBorn}</Moment></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <br></br><br></br>
                    <Typography paragraph>{data[item].strDescriptionEN}</Typography>
                </React.Fragment>
            ))}
        </div>
    );
}

export default PlayerDetails;