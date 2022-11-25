import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

class NLB extends Component {
    render() {
        return (
            <Container>
                <div>
                    <p>A <a href="https://aws.amazon.com/elasticloadbalancing/pricing/">Load Balancer Capacity Unit</a> measures the dimensions on which the Network Load Balancer processes your traffic (averaged over an hour). The four dimensions measured are: </p >
                    <ul>
                        <li><b>New connections or flows</b>: Number of newly established connections/flows per second. Many technologies (HTTP, WebSockets, etc.) reuse Transmission Control Protocol (TCP) connections for efficiency. The number of new connections is typically lower than your request or message count.</li>
                        <li><b>Active connections or flows</b>: Peak concurrent connections/flows, sampled minutely.</li>
                        <li><b>Processed bytes</b>: The number of bytes processed by the load balancer in GBs.</li>
                    </ul>
                    <p>For Transmission Control Protocol (TCP) traffic, an NLCU contains:</p>
                    <ul>
                        <li>800 new TCP connections per second.</li>
                        <li>100,000 active TCP connections (sampled per minute).</li>
                        <li>1 GB per hour for Amazon Elastic Compute Cloud (EC2) instances, containers, IP addresses, and Application Load Balancers as targets.</li>
                    </ul>
                    <p>For User Datagram Protocol (UDP) traffic, an NLCU contains:</p>
                    <ul>
                        <li>400 new UDP flows per second.</li>
                        <li>50,000 active UDP flows (sampled per minute).</li>
                        <li>1 GB per hour for Amazon Elastic Compute Cloud (EC2) instances, containers, IP addresses, and Application Load Balancers as targets.</li>
                    </ul>
                    <p>For Transport Layer Security (TLS) traffic, an NLCU contains:</p>
                    <ul>
                        <li>50 new TLS connections or flows per second.</li>
                        <li>3,000 active TLS connections or flows (sampled per minute).</li>
                        <li>1 GB per hour for Amazon Elastic Compute Cloud (EC2) instances, containers, IP addresses, and Application Load Balancers as targets.</li>
                    </ul>
                    <br></br>
                    <p>The table below demonstrates a breakdown of each dimension, the highest value is used for scaling and billing</p>
                </div >
            </Container>
        )
    }
}

export default NLB