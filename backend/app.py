from flask import Flask, request, jsonify
from flask_cors import CORS
import yfinance as yf

app = Flask(__name__)
CORS(app)  

@app.route('/get_stock_data', methods=['GET'])
def get_stock_data():
    ticker_symbol = request.args.get('ticker')
    

    if not ticker_symbol.endswith('.NS'):
        ticker_symbol += '.NS'

    if not ticker_symbol:
        return jsonify({'error': 'Ticker symbol is required'}), 400
    

    ticker = yf.Ticker(ticker_symbol)
    data = ticker.info

    required_data = {
        'ticker_symbol': ticker_symbol,
        'company_name' : data.get('longName'),
        'current_price': data.get('currentPrice'),
        'open_price': data.get('open'),
        'todays_high': data.get('dayHigh'),
        'todays_low': data.get('dayLow'),
        'dividend': data.get('dividendRate'),
        'market_cap' : data.get('marketCap'),
        'pe_ration' : data.get('trailingPE'),
        'fiftytwoweekhigh' : data.get('fiftyTwoWeekHigh'),
        'fiftytwoweeklow' : data.get('fiftyTwoWeekLow'),
    }
    return jsonify(required_data)

@app.route('/get_index_data', methods=['GET'])
def get_index_data():
    index_symbol = request.args.get('index')

    if index_symbol == 'NIFTY_50':
        index_symbol = '^NSEI'
    
    if index_symbol == 'BANK_NIFTY':
        index_symbol = '^NSEBANK'
    
    if index_symbol == 'FINNIFTY':
        index_symbol = '^CNXIT'
    
    if index_symbol == 'NIFTY_500':
        index_symbol = '^CRSLDX'
    
    if index_symbol == 'SENSEX':
        index_symbol = '^BSESN'

    if not index_symbol:
        return jsonify({'error': 'Index symbol is required'}), 400
    

    data = yf.Ticker(index_symbol)
    current_price = data.history(period="1d")['Close'][0]

    formatted_price = f"{current_price:.2f}"
    return jsonify({'currentPrice': formatted_price})

if __name__ == '__main__':
    app.run(debug=True)
