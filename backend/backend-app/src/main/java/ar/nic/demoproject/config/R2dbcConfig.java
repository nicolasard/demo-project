package ar.nic.demoproject.config;

import ar.nic.demoproject.db.model.*;
import io.r2dbc.spi.ConnectionFactories;
import io.r2dbc.spi.ConnectionFactory;
import io.r2dbc.spi.Row;
import java.time.Instant;
import java.util.List;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.ReadingConverter;
import org.springframework.data.convert.WritingConverter;
import org.springframework.data.r2dbc.config.AbstractR2dbcConfiguration;
import org.springframework.data.r2dbc.mapping.OutboundRow;
import org.springframework.r2dbc.core.Parameter;

@Configuration
public class R2dbcConfig extends AbstractR2dbcConfiguration {

    public ConnectionFactory connectionFactory() {
        return ConnectionFactories.get("r2dbc:…");
    }

    /** Custom Objects Read/Write converters, usefully when joining tables. */
    @Override
    protected List<Object> getCustomConverters() {
        return List.of(
                new UserProfileReadingConverter(),
                new TransactionReadingConverter(),
                new TransactionWritingConverter(),
                new CategorySummaryConverter());
    }

    // TODO This reader/writer should be in a custom package
    @ReadingConverter
    static class UserProfileReadingConverter implements Converter<Row, UserProfile> {
        @Override
        public UserProfile convert(final Row row) {
            final Currency currency = new Currency(row.get("currency_code", String.class));
            currency.setCurrencyDescription(row.get("currency_description", String.class));
            currency.setCurrencySymbol(row.get("currency_symbol", String.class));
            final UserProfile userProfile =
                    new UserProfile(
                            row.get("full_name", String.class), row.get("email", String.class));
            userProfile.setInternalId(row.get("internal_id", Integer.class));
            userProfile.setDefaultCurrency(currency);
            return userProfile;
        }
    }

    @ReadingConverter
    static class TransactionReadingConverter implements Converter<Row, Transaction> {
        @Override
        public Transaction convert(final Row row) {
            final Category category = new Category();
            category.setCategoryId(row.get("category_id", Integer.class));
            category.setCategoryName(row.get("category_name", String.class));
            final Transaction transaction = new Transaction();
            transaction.setId(row.get("transactionId", Integer.class));
            transaction.setUserInternalId(row.get("userInternalId", Integer.class));
            transaction.setAmount(row.get("amount", Float.class));
            transaction.setCurrency(row.get("currency", String.class));
            transaction.setDescription(row.get("description", String.class));
            transaction.setDate(row.get("date", Instant.class));
            if (category.getCategoryId() != null) {
                transaction.setCategory(category);
            }
            return transaction;
        }
    }

    @ReadingConverter
    static class CategorySummaryConverter implements Converter<Row, CategorySummary> {
        @Override
        public CategorySummary convert(final Row row) {
            final CategorySummary categorySummary = new CategorySummary();
            categorySummary.setTotal(row.get("amount", Double.class));
            final Category category = new Category();
            category.setCategoryName(row.get("category_name", String.class));
            category.setCategoryId(row.get("category_id", Integer.class));
            categorySummary.setCategory(category);
            return categorySummary;
        }
    }

    @WritingConverter
    static class TransactionWritingConverter implements Converter<Transaction, OutboundRow> {
        @Override
        public OutboundRow convert(final Transaction transaction) {
            final OutboundRow row = new OutboundRow();
            row.put(
                    "category_id",
                    Parameter.fromOrEmpty(
                            transaction.getCategory().getCategoryId(), Integer.class));
            row.put("transactionId", Parameter.fromOrEmpty(transaction.getId(), Integer.class));
            row.put(
                    "userInternalId",
                    Parameter.fromOrEmpty(transaction.getUserInternalId(), Integer.class));
            row.put("amount", Parameter.fromOrEmpty(transaction.getAmount(), Float.class));
            row.put("currency", Parameter.fromOrEmpty(transaction.getCurrency(), String.class));
            row.put(
                    "description",
                    Parameter.fromOrEmpty(transaction.getDescription(), String.class));
            row.put("date", Parameter.fromOrEmpty(transaction.getDate(), Instant.class));
            return row;
        }
    }
}
