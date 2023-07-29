import React from 'react'
import { Form } from 'react-bootstrap';
class BootstrapDatePickerComponent extends React.Component{
    
    render(){
        return(
            <div>
                <div className="row">
                    <div className="col" >
                        <Form.Group controlId="dob" >
                            <Form.Label>Odaberi dan</Form.Label>
                            <Form.Control type="date" name="dob" placeholder="Datum prikazivanja" width={100}/>
                        </Form.Group>
                    </div>
                </div>
                {/* <script>
                    var date = new Date();
                    date.setDate(date.getDate());

                    $('.datepicker').datepicker({
                        format: 'dd/mm/yyyy',
                        startDate: date
                        
                    });
                </script> */}
            </div>
            
        )

    }
    
}
export default BootstrapDatePickerComponent;