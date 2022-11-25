import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

class ALB extends Component {
    albPerHour = 0.0225;

    albPerHourFixed = () => this.albPerHour.toFixed(2);
    albPer30DaysFixed = () => (this.albPerHour * 24 * 30).toFixed(2);

    constructor(props) {
        super(props);

        this.state = {
            activeConnections: 0,
            activeConnectionsLCUs: 0,
            activeConnectionsCostPerHour: this.albPerHourFixed(),
            activeConnectionsCostPer30Days: this.albPer30DaysFixed(),
            newConnections: 0,
            newConnectionsLCUs: 0,
            newConnectionsCostPerHour: this.albPerHourFixed(),
            newConnectionsCostPer30Days: this.albPer30DaysFixed(),
            processedBytesEC2: 0,
            processedBytesEC2LCUs: 0,
            processedBytesEC2CostPerHour: this.albPerHourFixed(),
            processedBytesEC2CostPer30Days: this.albPer30DaysFixed(),
            processedBytesLambda: 0,
            processedBytesLambdaLCUs: 0,
            processedBytesLambdaCostPerHour: this.albPerHourFixed(),
            processedBytesLambdaCostPer30Days: this.albPer30DaysFixed(),
            ruleEvaluations: 0,
            ruleEvaluationsLCUs: 0,
            ruleEvaluationsCostPerHour: this.albPerHourFixed(),
            ruleEvaluationsCostPer30Days: this.albPer30DaysFixed(),
            processedBytesTargetValue: 1,
            processedBytesTargetText: "EC2",
        };

        this.onFormChange = this.onFormChange.bind(this);
    }

    onFormChange = (event) => {
        event.preventDefault();

        let { name, value } = event.target;

        let lcus = this.lcus(name, value)
        let costPerHour = this.costPerHour(lcus)
        let costPer30Days = this.costPer30Days(lcus)
        this.setState({
            [name]: value,
            [name + "LCUs"]: lcus,
            [name + "CostPerHour"]: costPerHour,
            [name + "CostPer30Days"]: costPer30Days
        });
    }

    lcus = (name, value) => {
        switch (name) {
            case "newConnections":
                return value / 25;
            case "activeConnections":
                return value / 3000;
            case "processedBytesEC2":
                return value / 1;
            case "processedBytesLambda":
                return value / 0.4;
            case "ruleEvaluations":
                return value / 1000;
            default:
                console.log("failed to implement lcus for " + name)
        }
    }

    costPerHour = (lcu) => Number(((0.008 * lcu) + 0.0225).toFixed(2));

    costPer30Days = (lcu) => Number(((0.008 * lcu) * 24 * 30 + 0.0225 * 24 * 30).toFixed(2));

    render() {
        return (
            <Container>
                <div>
                    <p>A <a href="https://aws.amazon.com/elasticloadbalancing/pricing/">Load Balancer Capacity Unit</a> measures the dimensions on which the Application Load Balancer processes your traffic (averaged over an hour). The four dimensions measured are: </p >
                    <ul>
                        <li><b>New connections</b>: Number of newly established connections per second. Typically, many requests are sent per connection</li>
                        <li><b>Active connections</b>: Number of active connections per minute</li>
                        <li><b>Processed bytes</b>: The number of bytes processed by the load balancer in GBs for HTTP(S) requests and responses</li>
                        <li><b>Rule evaluations</b>: The product of the number of rules processed by your load balancer and the request rate. The first 10 processed rules are free (Rule evaluations = Request rate * (Number of rules processed - 10 free rules)</li>
                    </ul>
                    <p>An LCU contains:</p>
                    <ul>
                        <li>25 new connections per second.</li>
                        <li>3,000 active connections per minute.</li>
                        <li>1 GB per hour for Amazon Elastic Compute Cloud (EC2) instances, containers, and IP addresses as targets, and 0.4 GB per hour for Lambda functions as targets.
                        </li>
                        <li>1,000 rule evaluations per second</li>
                    </ul>
                    <br></br>
                    <p>The table below demonstrates a breakdown of each dimension, the highest value is used for scaling and billing</p>
                </div >
                <table>
                    <thead>
                        <tr>
                            <th>LCU Type</th><th>LCU's per hour</th><th>Cost per hour</th><th>Cost per 30 days</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td width="40%">
                                <label for="newConnnections"><b>New Connections</b>: number of new connections per second (averaged over the hour)</label>
                                <input name="newConnections" id="newConnections" type="number" value={this.state.newConnections} onChange={this.onFormChange} />
                            </td>
                            <td width="20%">
                                {this.state.newConnectionsLCUs}
                            </td>
                            <td width="20%">
                                ${this.state.newConnectionsCostPerHour}
                            </td>
                            <td width="20%">
                                ${this.state.newConnectionsCostPer30Days}
                            </td>
                        </tr>
                        <tr>
                            <td >
                                <label for="activeConnections"><b>Active Connections</b>: number of active connections per minute (averaged over the hour)</label>
                                <input name="activeConnections" id="activeConnections" type="number" value={this.state.activeConnections} onChange={this.onFormChange} />
                            </td>
                            <td>
                                {this.state.activeConnectionsLCUs}
                            </td>
                            <td>
                                ${this.state.activeConnectionsCostPerHour}
                            </td>
                            <td>
                                ${this.state.activeConnectionsCostPer30Days}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label for="processedBytes"><b>Processed Bytes EC2</b>: total processed bytes as GBs per hour (averaged over the hour) with EC2 or IP target type</label>
                                <input name="processedBytesEC2" id="processedBytesEC2" type="number" value={this.state.processedBytesEC2} onChange={this.onFormChange} />
                            </td>
                            <td>
                                {this.state.processedBytesEC2LCUs}
                            </td>
                            <td>
                                ${this.state.processedBytesEC2CostPerHour}
                            </td>
                            <td>
                                ${this.state.processedBytesEC2CostPer30Days}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label for="processedBytesLambda"><b>Processed Bytes Lambda</b>: total processed bytes as GBs per hour (averaged over the hour) with Lambda target type</label>
                                <input name="processedBytesLambda" id="processedBytesLambda" type="number" value={this.state.processedBytesLambda} onChange={this.onFormChange} />
                            </td>
                            <td>
                                {this.state.processedBytesLambdaLCUs}
                            </td>
                            <td>
                                ${this.state.processedBytesLambdaCostPerHour}
                            </td>
                            <td>
                                ${this.state.processedBytesLambdaCostPer30Days}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label for="ruleEvaluations"><b>Rule Evaluations</b>: product of the number of rules evaluated per request and the request rate (averaged over the hour)</label>
                                <input name="ruleEvaluations" id="ruleEvaluations" type="number" value={this.state.ruleEvaluations} onChange={this.onFormChange} />
                            </td>
                            <td>
                                {this.state.ruleEvaluationsLCUs}
                            </td>
                            <td>
                                ${this.state.ruleEvaluationsCostPerHour}
                            </td>
                            <td>
                                ${this.state.ruleEvaluationsCostPer30Days}
                            </td>
                        </tr>
                        <tr style={{ height: "25px" }}>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><b>Resultant Values</b></td>
                            <td>{Math.max(this.state.activeConnectionsLCUs, this.state.newConnectionsLCUs, this.state.processedBytesEC2LCUs, this.state.processedBytesLambdaLCUs, this.state.ruleEvaluationsLCUs)}</td>
                            <td>${Math.max(this.state.activeConnectionsCostPerHour, this.state.newConnectionsCostPerHour, this.state.processedBytesEC2CostPerHour, this.state.processedBytesLambdaCostPerHour, this.state.ruleEvaluationsCostPerHour).toFixed(2)}</td>
                            <td>${Math.max(this.state.activeConnectionsCostPer30Days, this.state.newConnectionsCostPer30Days, this.state.processedBytesEC2CostPer30Days, this.state.processedBytesLambdaCostPer30Days, this.state.ruleEvaluationsCostPer30Days).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </Container >
        )
    }
}

export default ALB