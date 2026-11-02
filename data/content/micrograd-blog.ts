const microgradBlog = `<div class="blog-content">
  <br/>
  <p><strong>Building Micrograd: Backpropagation From Scratch</strong></p>
  <p><em>2 Nov 2026 · AI</em></p>

  <p>I followed Andrej Karpathy's lecture on backpropagation and built <strong>micrograd</strong>: an autograd engine that does for single numbers what PyTorch does for tensors.</p>

  <p>🔹 <strong>A derivative</strong> says how much the output moves when you nudge an input. For + the gradient of each input is 1; for * it is the other input.</p>
  <p>🔹 <strong>Value</strong> wraps each number and remembers how it was computed (data, grad, _prev, _op), building a computation graph during the forward pass.</p>
  <p>🔹 <strong>The chain rule</strong> multiplies local derivatives backwards through the graph. Each operation only needs to know its own.</p>
  <p>🔹 <strong>backward()</strong> does a topological sort so every node's gradient is complete before it is passed on. Gradients are accumulated with +=, so zero them before every pass.</p>
  <p>🔹 <strong>Neuron, Layer, MLP</strong> stack on top. MLP(3, [4, 4, 1]) has 41 parameters, all Values.</p>
  <p>🔹 <strong>Training</strong> is forward pass, squared-error loss, backward pass, then p.data += -0.01 * p.grad. The loss fell from about 5.27 to 0.0004.</p>

  <p>📖 Full post: <a href="https://ayroid.in/blogs/building-micrograd-backpropagation-from-scratch" target="_blank" rel="noopener noreferrer">ayroid.in/blogs/building-micrograd-backpropagation-from-scratch</a></p>
  <p>💻 Code: <a href="https://github.com/Ayroid/micrograd" target="_blank" rel="noopener noreferrer">github.com/Ayroid/micrograd</a></p>
</div>`;

export default microgradBlog;
