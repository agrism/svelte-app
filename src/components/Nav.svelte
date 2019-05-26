<script>
	export let segment;
</script>


<nav>
<div class="nav-wrapper">
	<!-- <a href="#" class="brand-logo">Logo</a> -->
	<ul>
	<li><a class='{segment === undefined ? "selected" : ""}' href='.'>home</a></li>
	<li><a class='{segment === "about" ? "selected" : ""}' href='about'>about</a></li>
	<li><a class='{segment === "partners" ? "selected" : ""}' href='partners'>partners</a></li>

	<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
			the blog data when we hover over the link or tap it on a touchscreen -->
	<li><a rel=prefetch class='{segment === "blog" ? "selected" : ""}' href='blog'>blog</a></li>

	</ul>
</div>
</nav>