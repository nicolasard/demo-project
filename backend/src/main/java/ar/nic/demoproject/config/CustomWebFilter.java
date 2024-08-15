package ar.nic.demoproject.config;

import io.opentelemetry.api.GlobalOpenTelemetry;
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.SpanBuilder;
import io.opentelemetry.api.trace.Tracer;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

/** Custom filter to intercept the requests and measure the time used with Otel */
@Component
public class CustomWebFilter implements WebFilter {

    final Tracer tracer = GlobalOpenTelemetry.getTracer("custom-web-filter-tracer");

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        final String userAgent = exchange.getRequest().getHeaders().getFirst("User-Agent");
        final String requestUri = exchange.getRequest().getURI().getPath();
        final SpanBuilder spanBuilder = tracer.spanBuilder("mainSpan");
        spanBuilder.setAttribute("BROWSER", userAgent);
        spanBuilder.setAttribute("URI", requestUri);
        final Span span = spanBuilder.startSpan();
        return chain.filter(exchange)
                .doFinally(
                        signalType -> {
                            span.end();
                        });
    }
}
