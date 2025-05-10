require 'webrick'
require 'listen'

# Create a simple HTTP server
server = WEBrick::HTTPServer.new(
  :Port => 35729,
  :DocumentRoot => Dir.pwd
)

# Create a hash to keep track of clients
clients = {}

# Create a listener to watch for file changes
listener = Listen.to(Dir.pwd, ignore: /\.git|_site/) do |modified, added, removed|
  puts "Files changed: #{modified.inspect}" unless modified.empty?
  puts "Files added: #{added.inspect}" unless added.empty?
  puts "Files removed: #{removed.inspect}" unless removed.empty?
  
  # Notify all clients of changes
  if !modified.empty? || !added.empty? || !removed.empty?
    clients.each do |client, _|
      begin
        client.print "data: reload\n\n"
        client.flush
      rescue
        clients.delete(client)
      end
    end
  end
end

# Add a servlet for SSE (Server-Sent Events)
server.mount_proc '/livereload' do |req, res|
  res['Content-Type'] = 'text/event-stream'
  res['Cache-Control'] = 'no-cache'
  res.chunked = true
  res.keep_alive = true
  
  clients[res.instance_variable_get(:@socket)] = true
  
  # Keep the connection open
  trap('INT') { server.shutdown }
  loop do
    sleep 1
  end
end

# Start the listener
listener.start

# Start the server
puts "Live reload server started on http://localhost:35729/livereload"
server.start