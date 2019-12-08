$(function(){

    var socket = io.connect('http://localhost:3000/chart-demo')
    var ctx = document.getElementById('myChart').getContext('2d');
    // save the chart instance to a variable

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'My data',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [],
                fill: false,
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'realtime'
                }]
            }
        }
    });

    $('#send-data').on('click', (event) => {
        var data =  $("#new-data").val();
        socket.emit('new_data', {'value' : data, 'timestamp': event.timeStamp})
    })


    //listener on new event
    socket.on('new_data', (data) => {
        // append the new data to the existing chart data
        myChart.data.datasets[0].data.push({
        x: Date.now(),
        y: data.value
    });

    // update chart datasets keeping the current animation
    myChart.update({
        preservation: true
        });

    });
});



